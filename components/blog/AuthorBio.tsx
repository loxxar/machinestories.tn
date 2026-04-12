import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  bio?: string;
  avatar?: string;
}

export default function AuthorBio({ name, bio = "Expert en intelligence artificielle et rédacteur principal de Machine Stories. Je décrypte les dernières avancées de l'IA pour vous.", avatar }: AuthorBioProps) {
  return (
    <aside className="flex items-start gap-4 p-5 bg-slate-900/50 border border-white/5 rounded-xl">
      <div className="flex-shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover ring-2 ring-cyan-500/20"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-1">Article écrit par</p>
        <Link href="/a-propos" className="font-heading font-semibold text-white hover:text-cyan-400 transition-colors">
          {name}
        </Link>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{bio}</p>
      </div>
    </aside>
  );
}
