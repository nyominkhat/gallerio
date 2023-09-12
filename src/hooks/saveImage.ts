import { saveAs } from "file-saver";

const saveImage = (url: string, tag: string) => {
  const string = tag !== "" ? tag.split(" ").join("_") : "gallerio";

  saveAs(url, string);
};

export default saveImage;
