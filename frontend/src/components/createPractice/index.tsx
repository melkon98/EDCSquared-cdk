import classNames from 'classnames';
import { IconLoader } from 'components/loader';
import ShouldRender from 'components/shouldRender';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { BestPracticeProps, withBestPractice } from 'state/bestPractice';
import { IProfileImageUpload } from 'state/profileSteps';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import {
  AllowedProfileSizeKB,
  initialCreatePracticeError,
  initialCreatePracticeState,
  UnknownType,
} from 'utils';
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export const CreatePractice: FC<BestPracticeProps> = ({
  saveData,
  loading,
  response,
  bestPracticeState,
}) => {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState(initialCreatePracticeState);
  const [image, setImage] = useState<IProfileImageUpload>({});
  const [formError, setFormError] = useState(initialCreatePracticeError);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const getDescription = (): string =>
    draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const handleChange = (
    key: string,
    value: string | Array<string> | boolean
  ): void => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setFormError((prev) => ({ ...prev, [key]: null }));
  };

  const handleImageChange = (e: UnknownType): void => {
    if (e?.target?.files?.[0]) {
      if (e.target.files[0].size > 10000000000000000)
        setImage({ error: `Maximum ${AllowedProfileSizeKB} KB size allowed` });
      else setImage({ file: e.target.files[0] });
    }
  };

  const updateEditorState = (e: UnknownType): void => {
    setEditorState(e);
    if (formError.description)
      setFormError({ ...formError, description: null });
  };

  const validateInputs = (): boolean => {
    const errObj = { ...initialCreatePracticeError };
    if (!formState.headLine.length) errObj.headLine = 'Headline is required';
    if (!getDescription().length)
      errObj.description = 'Best practice description is required';

    let imageError: string | undefined = undefined;
    if (!formState.urlPath && !image.file) imageError = 'Image is required';

    setFormError({ ...errObj });
    setImage({ ...image, error: imageError });
    return !(imageError || Object.values(errObj).find((e) => e));
  };

  const handleSubmit = async (): Promise<void> => {
    if (validateInputs()) {
      const imageId = Math.floor(100000000 + Math.random() * 900000000);
      const imageUrlPath =
        formState.urlPath || `bestPractices/images/${imageId}`;
      if (image.file) await Storage.put(imageUrlPath, image.file);
      saveData({
        ...formState,
        description: getDescription(),
        urlPath: imageUrlPath,
      });
    }
  };

  const uploadCallback = (file): Promise<UnknownType> => {
    return new Promise((resolve) => {
      if (file) {
        const imageId = Math.floor(100000000 + Math.random() * 900000000);
        const imageUrlPath = `bestPractices/description/${imageId}`;
        Storage.put(imageUrlPath, file).then(() => {
          Storage.get(imageUrlPath).then((url) => {
            resolve({ data: { link: url } });
          });
        });
      }
    });
  };

  const wrapDescription = (descp: string): string => {
    let newPos = 0;
    let newDescp = descp;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const openIndex = newDescp.indexOf('<img', newPos);
      const closeIndex = newDescp.indexOf('/>', openIndex);
      if (openIndex > -1 && closeIndex > -1) {
        newDescp =
          newDescp.slice(0, openIndex) +
          '<figure>' +
          newDescp.slice(openIndex, closeIndex + 2) +
          '</figure>' +
          newDescp.slice(closeIndex + 2);
        newPos = closeIndex + 17;
      } else break;
    }
    return newDescp;
  };

  useEffect(() => {
    if (response && !loading) navigate(-1);
  }, [response, loading]);

  useEffect(() => {
    if (bestPracticeState) {
      setFormState(bestPracticeState);
      const editorDesc = wrapDescription(bestPracticeState.description);
      const a = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          convertFromHTML(editorDesc)
        )
      );
      setEditorState(a);
    }
  }, [bestPracticeState]);

  const headingText = useMemo(
    () => (bestPracticeState ? 'Edit' : 'Create'),
    [bestPracticeState]
  );
  const imageName = useMemo(() => image.file?.name.slice(0, 15), [image]);

  return (
    <>
      <div className="creatives-table-label">
        Admin - {headingText} Best Practice
      </div>
      <div className="create-brief-box">
        <div className="create-best-practice-panel">
          <div className="field-label-container field-practice-headline">
            <div className="field-label">Headline</div>
            <input
              className="best-practice-input-box"
              value={formState.headLine}
              onChange={(e): void => handleChange('headLine', e.target.value)}
            />
            <ShouldRender if={formError.headLine}>
              <span>{formError.headLine}</span>
            </ShouldRender>
          </div>

          <div className="field-label-container field-practice-image">
            <div className="field-label">Main image</div>
            <input
              type="file"
              accept=".png, .jpg"
              onChange={handleImageChange}
              className="field-practice-image-input"
              ref={imageInputRef}
            />
            <button
              onClick={(): void => imageInputRef.current?.click()}
              className={classNames('best-practice-input-box', {
                isBlurred: !imageName,
              })}
            >
              {imageName || 'Upload image'}
            </button>
            <ShouldRender if={image.error}>
              <span>{image.error}</span>
            </ShouldRender>
          </div>

          <div className="field-label-container field-practice-status">
            <div className="field-label">Status</div>
            <select
              className="create-brief-input select-input best-practice-input-box"
              onChange={(e): void => handleChange('active', e.target.value)}
              value={formState.active}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div className="create-best-practice-panel">
          <Editor
            editorState={editorState}
            onEditorStateChange={updateEditorState}
            wrapperClassName="best-practice-editor-wrapper"
            editorClassName="best-practice-editor"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback },
            }}
          />
        </div>
        <ShouldRender if={formError.description}>
          <span className="editor-input-error">{formError.description}</span>
        </ShouldRender>
        <div className="create-best-practice-btn-panel">
          <div
            className="create-brief-btn create-practice-btn"
            onClick={handleSubmit}
          >
            <span className="create-brief-text">
              {headingText} Best Practice
            </span>
            {loading && <IconLoader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default withBestPractice(CreatePractice);
