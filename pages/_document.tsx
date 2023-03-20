// Has to be added in the pages folder
// Allows to manipulate all the HTML elements
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <body>
            <div id="overlays"></div>
            <Main></Main>
            <NextScript></NextScript>
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
