

type SectionProps = {
    title: string,
    content: string,
    body: string,
    number: number,
}

const InfoSection = ({ title, content, body, number }: SectionProps) => {
  return (
    <section className="flex flex-col justify-center items-center p-4">
        <h1>{title}</h1>
        <h2>{content}</h2>
        <p>{body}</p>
        <span>{number}</span>
        
    </section>
  )
}

export default InfoSection