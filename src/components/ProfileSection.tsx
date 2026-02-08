interface Props {
  profileImage: string;
}

export function ProfileSection({ profileImage }: Props) {
  return (
    <section className="mb-20">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
        <img
          src={profileImage}
          alt="Profile"
          width={144}
          height={144}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-36 h-36 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-4xl font-bold mb-4">Ayumu Kukutsu</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
}
