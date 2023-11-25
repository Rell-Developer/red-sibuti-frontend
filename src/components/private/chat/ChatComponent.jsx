// Importaciones
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MessageComponent from "./MessageComponent.jsx";
import Spinner from '../../public/Spinner.jsx';
// Importaciones
import { io } from 'socket.io-client';
import clienteAxios from "../../../config/axios.jsx";

const socket = io('http://localhost:3803');

// Componente
const ChatComponent = ({chat, chatList, setChatList}) => {
    // States
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    // let messages = [
    //     {
    //         id: 1,
    //         body: 'Mensaje de julian, estoy interesado en el puesto de trabajo',
    //         author: 'Julian Julian',
    //         own: false,
    //         createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    //     },
    //     {
    //         id: 2,
    //         body: 'Hola julian, estamos interesados en tu perfil, por favor, pasa por la empresa para una entrevista de trabajo el dia Lunes 30 de Octubre.',
    //         author: '',
    //         own: true,
    //         createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    //     }
    // ]

    useEffect(() => {
        // Evento que retorna cuando el socket se conecta correctamente
        socket.on('connect', ()=>{
            console.log('Conectado al socket');
    
        });        
        
        socket.on('chat_message', (data)=>{
            if (JSON.parse(sessionStorage.getItem("user")).name === data.author) {
                data.own = true;
            }else{
                data.own = false;
            }
            console.log(data);
            
            if (!conversationId && data.conversacioneId) {
                setConversationId(data.conversacioneId);
            }

            setMessagesList(messages => [...messages, data]);
        });

        if (messagesList.length == 0) {
            searchMessages()
        }
    
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () =>{
            socket.off('connect');
            socket.off('chat_message');
        }
    }, []);

    const searchMessages = async () =>{
        try {
            let { data } = await clienteAxios(`/get-messages/${chat.user.id}`);

            // console.log(data);

            
            if (JSON.parse(sessionStorage.getItem("user")).name === data.data.author) {
                data.data.own = true;
            }else{
                data.data.own = false;
            }
            // console.log(data.data);
            
            // data.data.forEach( msg => { 
            //     setMessagesList(messages => [...messages, msg]);
            // })
            setMessagesList(data.data)
            // for (let i = 0; i < data.data.length; i++) {
            //     console.log(data.data[i]);
            //     setMessagesList(messages => [...messages, data.data[i]]);
            // }
            // console.log(messagesList);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Funcion para enviar el mensaje
    const sendMessage = (e) => {
        // Prevenimos la accion por defecto
        e.preventDefault();
        // Si el mensaje esta vacio, retornamos
        if (message === '') {
            return
        }
        // Enviamos el mensaje al canal correspondiente
        socket.emit('chat_message', {
            body: message,
            conversacioneId: conversationId,
            createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            author: JSON.parse(sessionStorage.getItem("user")).name,
            usuarioId: JSON.parse(sessionStorage.getItem("user")).id,
            toUsuarioId: chat.user.id
        });
        // Retornamos la reasignacion del estado Message
        return setMessage('');
    }

    // Funcion para cerrar el chat
    const closeChat = ()=>{
        //Filtramos la lista de chats para quitar el chat que se quiere quitar 
        let newChatList = chatList.filter( conversation => conversation.id !== chat.id);
        // Asignamos la nueva lista de chats
        setChatList(newChatList);
    }

    // Seleccionar personal
    const selectPersonal = () => {
        let decision = confirm(`¿Está seguro de seleccionar como personal para el puesto a ${chat.user.fullName}?`);
        console.log(decision);
    }

    return (
        <div className={`${open ? 'h-full shadow-xl':''} bottom-0 right-0 flex flex-col mx-2 rounded-t-md`} style={{height: "550px", width: "28rem"}}>
            <div 
                id="headerChat" 
                className={`${open ? 'shadow-lg w-full':'absolute bottom-0 w-96'} bg-color4 text-white font-bold h-16 flex items-center justify-between cursor-pointer`}
                onClick={({target}) => target.id === 'headerChat' ? setOpen(!open):null}
            >
                <div className="mx-2">
                    <Link to={`/inicio/usuario/${chat.user.id}`}>
                        <p>{chat.user.fullName}</p>
                    </Link>
                </div>
                <div className="mx-2">
                    <button onClick={(e)=> closeChat(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="bodyChat" className={`bg-color1 h-full overflow-scroll rounded-t-md ${open ? 'h-96':'hidden'}`}>
                <div className="grid grid-cols-12 w-full overflow-scroll">
                    {
                        loading ? (
                            <>
                                <div className="col-span-full">
                                    <Spinner/>
                                </div>
                            </>
                        ):(
                            messagesList.map( (msg,index) => <MessageComponent key={index} message={msg}/>)
                        )
                    }
                </div>
            </div>
            <div id="footerChat" className={`bg-color4 py-3 h-16 flex items-center justify-around bottom-0 w-full ${open ? '':'hidden'}`}>
                <form onSubmit={(e)=> sendMessage(e)} className="w-5/6 flex justify-between">
                    <input type="text" className="bg-white rounded-lg p-2 w-5/6" placeholder="escriba su mensaje..." value={message} onChange={e => setMessage(e.target.value)}/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatComponent