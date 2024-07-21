import { isGeneratorObject } from "util/types";

export default async function loadJSON(file: File): Promise<any> {
  var fr, output;

  return new Promise((resolve, reject) => {
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);

    function receivedText(e: Event) {
      //   @ts-ignore
      let lines = e.target.result;
      resolve(JSON.parse(lines));
    }
  });
}
