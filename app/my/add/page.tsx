import AddAnnonceUI from "./AddAonnceUI"; 
import addAnnonceAction  from "./action";
/*
*/



export default function AddAnnonce() {
  return (
    <>
      <AddAnnonceUI addAnnonceAction={addAnnonceAction}/>
    </>
  );
}
