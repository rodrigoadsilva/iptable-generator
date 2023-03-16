/////////////////// ALTERA A LISTA DE CHAIN E POLICY /////////////////////////

// Selecionando o elemento radio-button com o name "iptTable"
const iptTableElement = document.getElementsByName('iptTable');

// Selecionando o elemento select com o id "iptChain"
const iptChainElement = document.getElementById('iptChain');

// Selecionando o elemento select com o id "iptPolicy"
const iptPolicyElement = document.getElementById('iptPolicy');

// Selecionando o elemento do form Ip Lan Destino com o id "formIpLanDestino"
const formIpLanDestino = document.getElementById('formIpLanDestino');

// Adicionando um evento de mudança ao radio-button
for (let i = 0; i < iptTableElement.length; i++) {
    iptTableElement[i].addEventListener('change', function() {
        // Verificando se o radio-button "iptTable_1" (NAT) foi selecionado
        if (iptTableElement[1].checked) {
            // Alterando as opções do seletor para PREROUTING, OUTPUT e POSTROUTING
            iptChainElement.innerHTML = `
                <option value="PREROUTING">PREROUTING</option>
                <option value="OUTPUT">OUTPUT</option>
                <option value="POSTROUTING">POSTROUTING</option>
            `;
            iptPolicyElement.innerHTML = `
                <option value="SNAT">SNAT</option>
                <option value="DNAT">DNAT</option>
                <option value="MASQUERADE">MASQUERADE</option>
            `;
            formIpLanDestino.style.display = 'block';
        } else {
            // Caso contrário, voltando as opções do seletor para INPUT, OUTPUT e FORWARD
            iptChainElement.innerHTML = `
                <option value="INPUT">INPUT</option>
                <option value="OUTPUT">OUTPUT</option>
                <option value="FORWARD">FORWARD</option>
            `;
            iptPolicyElement.innerHTML = `
                <option value="ACCEPT">ACCEPT</option>
                <option value="REJECT">REJECT</option>
                <option value="DROP">DROP</option>
            `;
            formIpLanDestino.style.display = 'none';
        }
    });
}


function coletaValores() {
    // Selector para input text
    const iptHostNameValue = document.querySelector('#iptHostName').value; // objeto.atritubo
    const iptIpOrigemValue = document.querySelector('#iptIpOrigem').value;
    const iptPortaOrigemValue = document.querySelector('#iptPortaOrigem').value;
    const iptIpDestinoValue = document.querySelector('#iptIpDestino').value;
    const iptInterfaceInValue = document.querySelector('#iptInterfaceIn').value;
    const iptInterfaceOut = document.querySelector('#iptInterfaceOut').value;

    const textAreaResultado = document.querySelector('#textAreaResultado');

    // Selector para select
    const iptChainValue = document.querySelector('#iptChain').value;
    const iptPolicyValue = document.querySelector("#iptPolicy").value;

    // Selector para radio
    const iptTable = document.querySelectorAll('input[name="iptTable"]');
    let selectedTableValue;
    for (const radio of iptTable) {
        if (radio.checked) {
            selectedTableValue = radio.value;
            if(selectedTableValue == "filter"){
                selectedTableValue = " "
            }
            else{
                selectedTableValue = " -t nat "
            }
            break;
        }
    }
    const iptTopDown = document.querySelectorAll('input[name="iptTopDown"]');
    let selectedTopDownValue;
    for (const radio of iptTopDown) {
        if (radio.checked) {
            selectedTopDownValue = radio.value;
            break;
        }
    }
    const iptProtocolo = document.querySelectorAll('input[name="iptProtocolo"]');
    let selectedProtocoloValue;
    for (const radio of iptProtocolo) {
        if (radio.checked) {
            selectedProtocoloValue = radio.value;
            break;
        }
    }
    
    let regras = "";
    if (iptIpOrigemValue != "") {
        regras += ` -s ${iptIpOrigemValue} `
    }
    // iptables -A FORWARD -s 172.196.32.0/24 -j ACCEPT
    let resultadoIptables = `iptables${selectedTableValue}-${selectedTopDownValue} ${iptChainValue}${regras}-j ${iptPolicyValue}`;

    textAreaResultado.innerHTML = `# ${iptHostNameValue}\n${resultadoIptables}`

}








