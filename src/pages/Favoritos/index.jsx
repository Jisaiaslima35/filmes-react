import './favoritos.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'


function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const meusFavoritos = localStorage.getItem('@primeFlix')
        setFilmes(JSON.parse(meusFavoritos) || [])
    },[])

    function excluirFilmes(id){
        let novaLista = filmes.filter(item => item.id !== id)
        setFilmes(novaLista)

        localStorage.setItem('@primeFlix', JSON.stringify(novaLista))
        toast.success('Filme Excluido Com Sucesso')

    }
    return(
        <div className='meu-favoritos'>
            <h1>MEUS FILMES</h1>

            {filmes.length === 0 && <span>Lista Vazia... :</span>}

            <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                            <button onClick={() => excluirFilmes(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}
export default Favoritos;