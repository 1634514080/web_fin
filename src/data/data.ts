interface accounter {
    pass: string;
    checkPass: string;
    phone: string;
    type: string;
  }

const admin : accounter = {
    pass: 'admin',
    checkPass: '123456',
    phone:'14735823262',
    type:"admin"
}

const user : accounter = {
    pass: 'user',
    checkPass: '147258',
    phone:'13546269770',
    type:"user"
}


export default {
    data:[
        admin,
        user,
    ]
}