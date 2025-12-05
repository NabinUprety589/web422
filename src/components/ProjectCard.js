export default function ProjectCard({ project, onFavourite }) {
  return (
    <div style={{ border: "1px solid black", padding: 10, marginTop: 10 }}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button onClick={() => onFavourite(project)}>Add to Favourites</button>
    </div>
  );
}
