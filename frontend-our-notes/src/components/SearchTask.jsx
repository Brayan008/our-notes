import React from 'react'

function SearchTask(props) {

    return (
        <>
            <div class="input-group mb-3">
                <input type="text"
                    class="form-control"
                    value={props.palabra}
                    onChange={(e) => { props.setPalabra(e.target.value) }}
                    placeholder="Search..." />
            </div>
        </>
    )
}

export default SearchTask