import React from 'react'
import "./MainHero.css"
import animals from "../../assets/images"
import {Container} from "reactstrap";
import { useQuery, gql } from "@apollo/client"

const FETCH_MAIN_CARDS = gql`
{
  mainCards {
    image
    title
  }
}
`

function MainHero() {
    const res = useQuery(FETCH_MAIN_CARDS);
    const { loading, error, data } = res; 
     console.log("MainHero", res, loading);
    console.log(data)

    if(loading) return <div>loading...</div>

    if(error) return <div>Some error happen</div>

    return (
        <div className="MainHero">
            <Container>
                    <div className="header-container">
                        <h2>Find your <br/> new four-legged <br/> best friend</h2>
                        <img src={animals.rhino} />
                    </div>
                    <div className="cards-container">
                        {data.mainCards.map(card => {
                            return (
                                <div className="card">
                                    <h3>{card.title}</h3>
                                    <img src={animals[card.image]} style={{width: "100%"}}/>
                                </div>
                            )
                        })}
                    </div>
            </Container>
        </div>
    )
}

export default MainHero
