import { useEffect, useState } from 'react';

import { Chat } from './Chat.js';
import { RoomInfo } from './RoomInfo.js';

const App = ( props ) => {

  const [ ID, setID ] = useState( '' );
  const [ messages, setMessages ] = useState( [] );
  const [ users, setUsers ] = useState( [] );

  useEffect( () => {

    props.socket?.on( 'connect', () => {
      setID( props.socket?.id );
    });

    props.socket?.on( 'newConnection', ( args ) => {
      setUsers( args );
    });
    
    props.socket?.on( 'messages', ( args ) => {
      console.log( args );

      setMessages( [...messages, args ] );
    });

  }, [ props.socket, messages, users ]);  

  return (
    <div id='AppBody' style={{ height: '100%'}} >
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mx-auto">React Real-time Chat App</span>
        </div>
      </nav>
      <div className='container' style={{ marginTop: '2%', height: '90%' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className='col-4'>
            <RoomInfo
              ID={ ID } 
              users={ users }
            />
          </div>
          <div className='col pl-0 pr-0 rounded' style={{ height: '100%'}}>
            <Chat 
              ID={ ID }
              socket={ props.socket } 
              messages={ messages }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
