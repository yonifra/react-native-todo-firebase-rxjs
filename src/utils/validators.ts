export const emailValidator = (email:string) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email tidak boleh kosong.';
    if (!re.test(email)) return 'Pastikan penulisan email telah sesuai.';

    return '';
};

export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password tidak boleh kosong.';
    if (password.length < 6) return 'Panjang kata sandi minimal 6 karakter';

    return '';
};
