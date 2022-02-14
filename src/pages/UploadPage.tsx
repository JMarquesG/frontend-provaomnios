import React from "react";
import { Link } from "react-router-dom";


class Upload extends React.Component<{}, {token: string, file: any}> {
    constructor(props:any) {
        super(props);
        this.state = {
            token: props.token.token,
            file: undefined
        }
      }

      onButtonClick = async () => {
        const formData = new FormData();

        console.log(this.state.file);
		    formData.append('file', this.state.file);
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
          },
          body: formData
        })
      };

      selectFile = async (e: any) => {
        console.log(e.target.files[0]);
        this.setState({file:  e.target.files[0]});
      }

      readBlob = async (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
      
        reader.onload = (e: any) => {
          resolve(e.target.result);
        };
      
        reader.readAsText(file);
      });
      
  
      render(): React.ReactNode {
        return (
          <>
            <main>
              <input type='file' id='file' onChange={this.selectFile}  />
              <button onClick={this.onButtonClick}>Upload</button>
            </main>
            <nav>
              <Link to="/">Llista</Link>
            </nav>
          </>
        );
      }
    
}

export default Upload;