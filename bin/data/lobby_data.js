let lobby = {
    rooms: [
        {   name: "Room 1",     maxUsers: 4,    users: [],   id: "room001"  },
        {   name: "Room 2",     maxUsers: 4,    users: ["A","B","C"],   id: "room002"  },
        {   name: "Room 3",     maxUsers: 4,    users: ["A","B","C", "D"],   id: "room003"  },
        {   name: "Room 4",     maxUsers: 4,    users: ["A","B"],   id: "room004"  },
        {   name: "Room 5",     maxUsers: 4,    users: ["A","B","C","D"],   id: "room005"  }
    ]
};
module.exports = lobby;