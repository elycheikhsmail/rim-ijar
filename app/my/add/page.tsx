import AddAnnonceUI from "./AddAnnonceUI"; 
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
