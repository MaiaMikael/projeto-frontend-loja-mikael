interface InformationItem {
  text: string;
  link?: string | undefined;
}

export function Information({ title, informations }: { title: string; informations: InformationItem[] }) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>
      <ul className="flex flex-col gap-3">
        {informations.map((info) => (
          <li key={info.text} className="text-sm">
            {info.link ? (
              <a href={info.link} className="transition-colors hover:text-primary">{info.text}</a>
            ) : (
              info.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
