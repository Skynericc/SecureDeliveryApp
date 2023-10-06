import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/admin.css';
import CommandCard from '../items/command.js';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [commands, setCommands] = useState([]);
  const [userMap, setUserMap] = useState(new Map());
  const [filteredCommands, setFilteredCommands] = useState([]);

  useEffect(() => {
    // Fetch commands from the API
    axios.get('http://localhost:3000/command') //
      .then((response) => {
        setCommands(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commands:', error);
      });
  }, []);

  useEffect(() => {
    // Filter the commands to include only those with estValide set to false
    const filtered = commands.filter((command) => !command.estValide);
    setFilteredCommands(filtered);

    // Fetch user details for each command and store them in a map
    const fetchUserDetails = async () => {
      const userMapCopy = new Map();

      for (const command of filteredCommands) {
        if (!userMap.has(command.utilisateur)) {
          try {
            const response = await axios.get(
              `http://localhost:3000/user/${command.utilisateur}`
            ); 
            const user = response.data;

            if (user) {
              userMapCopy.set(command.utilisateur, user);
            }
          } catch (error) {
            console.error('Error fetching user by ID:', error);
          }
        }
      }

      setUserMap(new Map(userMapCopy));
    };

    fetchUserDetails();
  }, [commands]);

  const handleDeleteCommand = (commandId) => {
    // Remove the command from the list of commands in the state
    const updatedCommands = commands.filter((command) => command._id !== commandId);
    setCommands(updatedCommands);
  };
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <div className='header'>
        <table width='100%'>
          <tr>
            <td align='left'>
              <span className='header-span'>Welcome to Jumia France</span>
            </td>
            <td align='right' width='100px'>
              <button className='header-button'onClick={handleLogoutClick}>Logout</button>
            </td>
            <td align='right' width='70px'>
              <button className='header-button'>Help</button>
            </td>
          </tr>
        </table>
      </div>
      <div className="commands-container">
        {filteredCommands.map((command) => (
          <CommandCard
            key={command._id}
            clientName={`${userMap.get(command.utilisateur)?.nom || ''} ${
              userMap.get(command.utilisateur)?.prenom || ''
            }`}
            clientAddress={command.adresse}
            products={command.produits}
            totalPrice={command.totalPrice}
            command={command}
            onDeleteCommand={handleDeleteCommand}
          />
        ))}
      </div>
    </div>
  );
}

export default Admin;