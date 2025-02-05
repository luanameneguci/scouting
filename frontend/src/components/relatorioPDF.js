import jsPDF from 'jspdf';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
const generatePDF = ( report ) => {
            const doc = new jsPDF();

            // Add title
            doc.text('Relatório de Dados', 20, 10);

            // Add report details
            doc.text(`ID: ${report.id_relatorio}`, 20, 20);
            doc.text(`Nome: ${report.atletum.nome}`, 20, 30);
            doc.text(`Data: ${report.data}`, 20, 40);
            doc.text(`Treinador: ${report.utilizador.nome}`, 20, 50);
            doc.text(`Clube (casa): ${report.jogo.JogoClubes[0].RelatedClube.nome}`, 20, 60);
            doc.text(`Clube (fora): ${report.jogo.JogoClubes[1].RelatedClube.nome}`, 20, 70);
            doc.text(`Data de Jogo: ${formatDate(report.jogo.data)}`, 20, 80);
            doc.text(`Técnica: ${report.tecnica}`, 20, 90);
            doc.text(`Velocidade: ${report.velocidade}`, 20, 100);
            doc.text(`Atitude Competetiva: ${report.atitudecompetitiva}`, 20, 110);
            doc.text(`Inteligência: ${report.inteligencia}`, 20, 120);
            doc.text(`Altura: ${report.altura}`, 20, 130);
            doc.text(`Morfologia: ${report.morfologia}`, 20, 140);
            doc.text(`Apontamentos: ${report.apontamentos}`, 20, 150);



            // Save the PDF
            doc.save(`relatorio_${report.id_relatorio}.pdf`);
        };

export default generatePDF;