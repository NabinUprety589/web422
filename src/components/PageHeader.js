export default function PageHeader({ text, subtext }) {
  return (
    <div className="mb-5">
      <h1 className="display-5">{text}</h1>
      {subtext && <p className="lead">{subtext}</p>}
      <hr className="my-4" />
    </div>
  );
}
