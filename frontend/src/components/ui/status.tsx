import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface Props {
  value: string;
}

const iconMap = {
  approved: CheckIcon,
  rejected: XMarkIcon,
  inactive: XMarkIcon,
};

export default function Status({ value }: Props) {
  const isShortForm = ['Rejected', 'Submitted', 'Approved'].includes(value);
  const status = isShortForm ? `${value}` : value;
  const Icon = iconMap[status];

  return (
    <span
      className={`uppercase font-bold flex items-center gap-1 ${['Rejected', 'inactive'].includes(status)
          ? 'text-danger' : ['Submitted'].includes(status) ? 'text-orange-200'
            : 'text-success'
        }`}
    >
      {Icon ? <Icon className="h-4 w-4" /> : <span className="mx-1">●</span>}
      {status}
    </span>
  );
}
