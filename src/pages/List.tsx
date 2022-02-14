import React from "react";
import { Link } from "react-router-dom";


class List extends React.Component<{}, {token: string, data: string[]}> {
    constructor(props:any) {
        super(props);
        this.state = {
            token: props.token.token,
            data: []
        }
        this.getData();
    }
    
    getData = async () => {
        const response  =  await fetch('http://localhost:3000/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
            }
        })

        this.setState({data : await response.json()});
        console.log(this.state.data);
        this.forceUpdate();
    }

    render(): React.ReactNode {
        return (
            <>
              <main>
                {this.state.data.map((item: any) => {
                    return <p>{item}</p>
                })}
              </main>
              <nav>
                <Link to="/upload">Upload</Link>
              </nav>
            </>
          );
    }
    
}

export default List;