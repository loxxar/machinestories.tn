import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  bio?: string;
  avatar?: string;
}

export default function AuthorBio({ name, bio, avatar }: AuthorBioProps) {
  return (
    <aside className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="flex-shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Article écrit par</p>
        <Link href="/a-propos" className="font-heading font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          {name}
        </Link>
        {bio && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{bio}</p>
        )}
      </div>
    </aside>
  );
}
