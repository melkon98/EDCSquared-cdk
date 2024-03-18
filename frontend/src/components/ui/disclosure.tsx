import { Disclosure as DisclosureBase, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  title: string;
  className?: string;
  defaultOpen?: boolean;
};

export default function Disclosure({
  children,
  title,
  className,
  defaultOpen = true,
}: Props) {
  return (
    <DisclosureBase defaultOpen={defaultOpen}>
      <section className="my-4">
        {title && (
          <DisclosureBase.Button
            className="text-xl text-primary font-medium mb-2 flex items-center justify-between w-full"
            title={'Toggle section'}
          >
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </span>
            <ChevronRightIcon className="w-6 h-6 ui-open:rotate-90 transition" />
          </DisclosureBase.Button>
        )}
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <DisclosureBase.Panel className={className}>
            {children}
          </DisclosureBase.Panel>
        </Transition>
      </section>
    </DisclosureBase>
  );
}
