import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GlobalStyle from './GlobalStyle'
import CardEscolha from './Components/CardEscolha/CardEscolha'
import TelaMatches from './pages/TelaMatches'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { FundoPagina, AstroMatch } from './styled.js'
import { data_Url } from './constants/data-url'

export default function App() {

  const [perfil, setPerfil] = useState("")
  const [proximo, setProximo] = useState(0)
  const [tela, setTela] = useState("card escolha")
  const [perfisNovos, setPerfisNovos] = useState(true)
  const [like, setLike] = useState(null)

  useEffect(() => {
    if (perfisNovos) {
      axios.get(`${data_Url}/person`)
        .then((resposta) => {
          setPerfil(resposta.data.profile)
        }).catch((erro) => {
          console.log(erro.data)
          window.confirm("No more profiles, do you want to restart?")
          if (window.confirm) {
            reiniciarApp()
          } else {
            setPerfisNovos(false)
            setTela("ver matches")
          }
        })
    }
  }, [proximo]
  )

  const proximoPerfil = () => {
    setProximo(proximo + 1)
  }
  
  const curtirPerfil = () => {
    proximoPerfil()
    setLike(true)
  }

  const descurtirPerfil = () => {
    proximoPerfil()
    setLike(false)
  }

  const trocaTela = () => {
    (tela === "card escolha" ?
      setTela("matches") :
      setTela("card escolha"));
  }

  const reiniciarApp = () => {
    axios.put(`${data_Url}/clear`)
  }

  return (
    <FundoPagina>
      <GlobalStyle />
      <AstroMatch>
        <Header trocaTela={trocaTela}
          tela={tela} />
        {(tela === "card escolha" && perfil) ?
          <>
            <CardEscolha perfil={perfil} like={like} />
            <Footer curtirPerfil={curtirPerfil} descurtirPerfil={descurtirPerfil} id={perfil.id} tela={tela} />
          </> :
          <TelaMatches />
        }
      </AstroMatch>
      <button onClick={reiniciarApp}>Reiniciar App</button>
    </FundoPagina>
  );
}