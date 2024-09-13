interface ITypographyWithChildren {
  text?: string;
  children?: React.ReactNode;
}

function Muted({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <p className="text-sm text-muted-foreground">
      {text}
      {children}
    </p>
  );
}

function Small({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <small className="text-sm font-medium leading-none">
      {text}
      {children}
    </small>
  );
}

function Large({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <div className="text-lg font-semibold">
      {text}
      {children}
    </div>
  );
}

function Lead({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <p className="text-xl text-muted-foreground">
      {text}
      {children}
    </p>
  );
}

function InlineCode({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {text}
      {children}
    </code>
  );
}

function List({
  textArr,
  children,
}: {
  textArr: string[];
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {textArr.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
      {children}
    </>
  );
}

function Blockquote({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {text}
      {children}
    </blockquote>
  );
}

function P({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {text}
      {children}
    </p>
  );
}

function H4({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {text}
      {children}
    </h4>
  );
}

function H3({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
      {children}
    </h3>
  );
}

function H2({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
      {children}
    </h2>
  );
}

function H1({ text, children }: ITypographyWithChildren): JSX.Element {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
      {children}
    </h1>
  );
}

const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
};
export default Typography;
