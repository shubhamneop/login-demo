import React from 'react'
import Button from '../../components/UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';


const channelList = (props) => {
    return (
        <tr style={{textAlign: "center"}}>
          <td>{props.name}</td>
          <td>
            <Button btnType="Danger" clicked={() => props.chat(props.name,props.id)} title="Msg"><FontAwesomeIcon icon={faEnvelopeOpenText} /></Button>
           
          </td>

      </tr>
    );
}

export default channelList;