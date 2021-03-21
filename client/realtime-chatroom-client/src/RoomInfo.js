import React from 'react'

export const RoomInfo = ( props ) => {

    const {
        ID,
        users
    } = props;

    return (
        <div style={{ height: '100%' }}>
            <div className='container-fluid RoomInfoContainer'>
                <span style={{ color: 'black' }}>Client ID: { ID }</span>

                <div className='mt-5'>
                    Connected Clients:

                    <div className='mt-3'>
                        {
                            users.map( ( user, index ) => {
                                return <p className='' style={{ color: 'black' }}> { user } </p>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
