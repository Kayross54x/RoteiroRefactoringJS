const { formatarMoeda } = require("./util.js");

const gerarFaturaStr = (fatura, calc) => {
	// corpo principal (após funções aninhadas)
	let faturaStr = `Fatura ${fatura.cliente}\n`;
	for (let apre of fatura.apresentacoes) {
		faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
	}
	faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
	faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
	return faturaStr;
};

const gerarFaturaHTML = (fatura, pecas) => {
	// corpo principal (após funções aninhadas)
	const title = `Fatura ${fatura.cliente}`;
	let listApre = [];

	for (let apre of fatura.apresentacoes) {
		listApre.push(`<li>${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)</li>`);
	}

	const totalValue = `Valor total: ${formatarMoeda(calcularTotalFatura(pecas, fatura.apresentacoes))}`;
	const totalCredits = `Créditos acumulados: ${calcularTotalCreditos(pecas, fatura.apresentacoes)}`;

	const faturaStr = `
		<html>
			<p> ${title} </p>
			<ul>
				${listApre.join('\n \t \t \t \t')}
			</ul>
			<p> ${totalValue} </p>
			<p> ${totalCredits} </p>
		</html>
	`;

	return faturaStr;
};

// Exportando usando module.exports
module.exports = {
	gerarFaturaStr,
	gerarFaturaHTML,
};
