import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../services/api";
import './filme.css';
import {toast} from 'react-toastify'

function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate(); 


    useEffect(()=> {
        async function loadFilmes(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '854ef6ccf32507aa784d9d13d0820594',
                    language: 'pt-BR',
                }
            })
            // promess caso de sucesso
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            // promess cado de erro
            .catch(()=>{
                console.log('filme nao encontrado')
                navigation('/', { replace: true })
                return; 
            })

        }
        loadFilmes()

        return () => {
            console.log('componente foi desmontado')
        }


    },[])

    
    function salvar(){
        // captura o que tem no localstorage
        const minhaLista = localStorage.getItem('@primeFlix')
        //agora criar uma array com sem elementos
        let filmesSalvos = JSON.parse(minhaLista) || [];

        // faz comparaçao novo operador some()
        const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id)
        if(hasFilme){
            toast.warn('Esse Filme ja Esta Na Sua Lista.')
            return;
        }
        filmesSalvos.push(filme) 
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos))
        toast.success('filme Salvo Com Sucesso')
    }
    if(loading){
        return(
            <div className="msm">
                <h1>Aguarde Carregando...</h1>
                <img src={'https://usagif.com/wp-content/uploads/loading-4.gif'}  />
            </div>
        )
    }


    return (
        <div className="filme-info">
            <h1> {filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>

            <span>{filme.overview}</span>

            <strong>Avaliaçao: {filme.vote_average} / 10</strong>

            <div className="area-button">
                <button onClick={salvar}>Salvar</button>
                <button>
                    <a rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank">
                    
                    Trailler</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;