//import { Annonce } from "../types";
import {  AnnonceDetailsUI } from "@/app/lib/db/types";
import { Key } from "react";


export default function AnnonceDetailUI(
  props: { annonceId: number; annonce: AnnonceDetailsUI },
) {
  // filter option there 
  // let  options = []
  // if(props.annonce.options_object){
  //   options = props.annonce.options_object.filter((detail, index)=>{
     
      
  //     return 
  //   })
  // }
  return (
    <main className="min-h-screen">
      <div className="p-8">

        <article className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-8">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {props.annonce.categorie}
          </span>
          <h1 className="text-3xl font-bold mb-4">
            {props.annonce.description.split(" ")[0]}
          </h1>

          <p className="text-gray-600 mb-4">{props.annonce.description}</p>
          <div>
            <table>
              <tbody>
                {props.annonce.options_object &&
                  props.annonce.options_object.map((detail: { [x: string]: any; }, index: number) => {
                    const key = Object.keys(detail)[0];
                    const value = detail[key];

                    // Définir les couleurs pour les colonnes
                    const keyColor = index % 2 === 0 ? '#f2f2f2' : '#d9d9d9'; // Couleur alternée pour la première colonne
                    const valueColor = index % 2 === 0 ? '#e6e6e6' : '#c0c0c0'; // Couleur alternée pour la deuxième colonne

                    return (
                      <tr key={index}>
                        <td style={{ backgroundColor: keyColor, padding: '10px' }}>
                          {key}
                        </td>
                        <td style={{ backgroundColor: valueColor, padding: '10px' }}>
                          {value}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <p className="text-2xl font-bold mb-4">
            {props.annonce.price}€ / jour
          </p>

        </article>
      </div>
    </main>
  );
}
