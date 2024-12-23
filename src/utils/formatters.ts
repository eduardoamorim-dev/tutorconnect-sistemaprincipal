export const formatCourseName = (course: string): string => {
    const courseFormatMap: { [key: string]: string } = {
    'analiseedesenvolvimentodesistemas': 'Análise e Desenvolvimento de Sistemas',
    'engenhariaeletrica': 'Engenharia Elétrica',
    'gestaocomercial': 'Gestão Comercial',
    'tecadministracao': 'Técnico em Administração',
    'teccontabilidade': 'Técnico em Contabilidade',
    'teceletronica': 'Técnico em Eletrônica',
    'tecinformatica': 'Técnico em Informática',

    };

    // Remove espaços e caracteres especiais para fazer a comparação
    const normalizedCourse = course.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '');
    return courseFormatMap[normalizedCourse] || course;
}





