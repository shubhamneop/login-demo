import React from 'react'
import Button from '../../../components/UI/Button/Button';


const user = (props) => {
    return(
      <tr style={{textAlign: "center"}}>
          <td>{props.id}</td>
          <td>{props.name}</td>
          <td>{props.email}</td>
          <td>
            <Button btnType="Success" clicked={() => props.edit(props.token,props.id)}>Edit</Button>
            <Button btnType="Danger" clicked={() => props.clicked(props.id)}>Delete</Button>
          </td>

      </tr>
    );
}

export default user;