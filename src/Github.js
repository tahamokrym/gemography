import React, { Component } from 'react'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

class Github extends Component {


    constructor(props){
        super(props);
        this.state={
            list: [],
            page:1
        }
    }

    componentDidMount() {  //la connexion dans la première fois
        var url="";
        url="https://api.github.com/search/repositories?q=created:>2020-07-24&sort=stars&order=desc&page="+this.state.page;
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({
                list: responseJson.items
            }))
            .catch(()=>{console.log("il ya un erreur dans la connexion avec le serveur de Github")})
    }
    

    onChange = (page,pageSize) =>{ //si on change la page, l'api va changer aussi dans la page correspondante
        var url="";
        url="https://api.github.com/search/repositories?q=created:>2020-07-24&sort=stars&order=desc&page="+page;
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({
                list: responseJson.items
            }))
            .catch(()=>{console.log("il ya un erreur dans la connexion avec le serveur de Github")})
    }

    render(){  //l'api de github nous donne 30 repository par JSON, et j'ai choisi d'afficher 500 repos au total
        return (
            <div>
                <Pagination defaultCurrent={1} pageSize={30} onChange={this.onChange} total={500} />
                <div>
                    <table className="table table-hover"> 
                        <thead>
                            <tr>
                                <th></th>
                                <th>Repository name</th>
                                <th>Repository description</th>
                                <th>nb stars</th>
                                <th>nb issues</th>
                                <th>time interval</th>
                            </tr>
                        </thead>
                        <tbody>

                        {this.state.list.map(
                            element =>
                                <tr key={element.id}>
                                    <td><img src={element.owner.avatar_url} width="100"></img></td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>{element.stargazers_count}</td>
                                    <td>{element.open_issues_count}</td>
                                    <td><p>created at {element.created_at.split("T0")[0]} by </p><p style={{color:"red"}}>{element.owner.login}</p></td> 
                                </tr>
                        )}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Github;