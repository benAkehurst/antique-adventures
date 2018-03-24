import AntiqueDataModel from './AntiqueDataModel';

class UserDataModel {
    _id: string;
    name: String = '';
    email: String = '';
    password: String = '';
    image: String = '';
    createdAntiques: AntiqueDataModel[] = [];
}

export default UserDataModel;
