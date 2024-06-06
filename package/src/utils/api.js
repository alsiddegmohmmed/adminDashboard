import axios from 'axios';

export const fetchUserCount = async () => {
    try {
        const response = await axios.get('/api/users/count');
        return response.data.count;
    } catch (error) {
        console.error('Error fetching user count:', error);
        return 0;
    }
};

export const fetchStudentCount = async () => {
    try {
        const response = await axios.get('/api/users/count/students');
        return response.data.count;
    } catch (error) {
        console.error('Error fetching student count:', error);
        return 0;
    }
};

export const fetchTeacherCount = async () => {
    try {
        const response = await axios.get('/api/users/count/teachers');
        return response.data.count;
    } catch (error) {
        console.error('Error fetching teacher count:', error);
        return 0;
    }
};



