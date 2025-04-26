interface PropsCardProps {
  title: string;
  description: string;
  image: string;
  altText: string;
  backroundColor: string;
}

const PropsCard = ({
  title,
  description,
  image,
  altText,
  backroundColor,
}: PropsCardProps) => {
  return (
    <section
      className="flex flex-col m-auto p-4 rounded-lg w-85"
      style={{ backgroundColor: backroundColor }}
    >
      <h1 className="text-2xl self-center py-4">{title}</h1>
      <article className="flex flex-col items-center justify-center w-full h-full p-4">
        <img src={image} alt={altText} />
        <p className="self-center mt-4">{description}</p>
      </article>
    </section>
  );
};

export default PropsCard;
