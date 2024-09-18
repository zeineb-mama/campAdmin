import React from 'react'

const NotFound = () => {
    return (
        <div className="not-found" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: '30%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '15px' }}>
                    <h1>404</h1>
                    <p style={{ fontSize: '24px', color: 'grey' }}>Page not found</p>
                </div>
            </div>
        </div>)
}

export default NotFound