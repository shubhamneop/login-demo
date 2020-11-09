import React from 'react'
import Button from '../../../components/UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';


const user = (props) => {
    return(
      <tr style={{textAlign: "center"}} key={props.uid}>
          <td><input  type="checkbox"  onChange={event =>  props.checkedHandler(event, event.target.checked)} value={props.uid} name={props.name} /></td>
          <td>{props.name}</td>
          <td>{props.email}</td>
          <td>
            <Button btnType="Success" clicked={() => props.edit(props.token,props.id)} title="Edit User"><FontAwesomeIcon icon={faEdit} /></Button>
            <Button btnType="Danger" clicked={() => props.clicked(props.id)} title="Delete User"><FontAwesomeIcon icon={faTrash} /></Button>
            <Button btnType="Danger" clicked={() => props.chat(props.name,props.uid)} title="Msg"><FontAwesomeIcon icon={faEnvelopeOpenText} /></Button>
           
          </td>

      </tr>
    );
}

export default user;