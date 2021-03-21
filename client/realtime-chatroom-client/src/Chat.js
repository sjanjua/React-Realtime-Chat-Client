import React, { useState } from 'react'

export const Chat = ( props ) => {

    const [ inputValue, setInputValue ] = useState( '' );

    const { 
        socket,
        ID,
        messages
    } = props;

    const sendMessage = () => {

        if ( inputValue !== '' ) {
            socket.emit( 'send', { 
                'ID'      : ID,
                'message' : inputValue, 
            });
            setInputValue( '' );
        }
    }

    return (
        <div style={{ height: '100%'}}>
            <div id='chat' className='container-fluid ChatBodyContainer'>
                {
                    messages.map( ( message, index ) => {

                        var classes = message.ID === ID ? 'card mb-3 shadow float-right MessageSent' : 'card mb-3 shadow float-left MessageRecieved';

                         return <div key={ index } className={ classes } style={{ width: '60%' }} >
                             <div className='card-body'>
                                 <div className='ClientID'>{ message.ID }</div>
                                 <div>{ message.message }</div>
                             </div>
                         </div>
                    })
                }
            </div>
            <div className='container-fluid InputContainer'>
                <div className='row align-items-center justify-content-center mx-auto' style={{ height: '100%'}}>   
                    <textarea
                        style={{ resize: 'none' }}
                        className='form-control col-8' 
                        rows='1'
                        value={ inputValue }
                        onChange={ ( e ) => setInputValue( e.target.value ) }
                    />
                    <button 
                        className='btn col-3 SendButton ml-2'
                        onClick={ sendMessage }
                    >
                        Send
                    </button>
                </div>  
            </div>
        </div>
    )
}
