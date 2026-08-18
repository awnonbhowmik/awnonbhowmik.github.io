type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export default function JsonLd({ data }: Readonly<{ data: JsonLdData }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
