import React from "react";
import { Link } from "react-router-dom";
function home() {
  return (
    <>
      <div className="row m-2 p-2">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="section-title text-center mb-4 pb-2">
                <h1 class="title mb-4">Nos services</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mb-5">
    <div class="row">
        <div class="col-md-4">
            <div class="box">
                <div class="our-services settings">
                    <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png "/> </div>
                    <h4>Page Performance Analysis</h4>
                    <p>Le service fournit des informations sur les temps de chargement et les performances des pages, en mettant en évidence les goulets d'étranglement potentiels qui pourraient avoir un impact sur l'expérience et l'engagement des utilisateurs.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="box">
                <div class="our-services speedup p-2">
                    <div class="icon"> <img src="https://i.imgur.com/KMbnpFF.png " /> </div>
                    <h4>Real Time Monitoring</h4>
                    <p className="m-2 p-2">Le suivi et la surveillance en temps réel offrent une vision immédiate de la manière dont les utilisateurs interagissent avec un site web. Cela peut être particulièrement utile pour analyser l'impact des changements ou des nouvelles fonctionnalités.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="box">
                <div class="our-services privacy p-2">
                    <div class="icon"> <img src="https://i.imgur.com/AgyneKA.png "/> </div>
                    <h4>Privacy and Compliance</h4>
                    <p>Le service garantit la conformité avec les réglementations pertinentes en matière de protection de la vie privée (telles que le GDPR) et offre des fonctionnalités permettant de respecter le consentement de l'utilisateur, d'anonymiser les données et de fournir des options de retrait.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="box">
                <div class="our-services backups p-2">
                    <div class="icon"> <img src="https://i.imgur.com/vdH9LKi.png" /> </div>
                    <h4>User Session Recording</h4>
                  <p className="mb-2p-3">Le site web offre des capacités d'enregistrement de session, permettant aux propriétaires de sites web de capturer et de rejouer les interactions des utilisateurs. Il s'agit notamment des mouvements de souris, des clics, du défilement, des soumissions de formulaires et d'autres actions effectuées par les visiteurs pendant leur séjour sur le site web.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="box">
                <div class="our-services ssl p-2">
                    <div class="icon"> <img src="https://i.imgur.com/v6OnUqu.png" /> </div>
                    <h4>Data Privacy and Confidentiality
                    </h4>
                    <p>SSL/TLS crypte les données échangées entre le navigateur de l'utilisateur et le serveur du site web. Ce cryptage garantit que toutes les données collectées sur le comportement de l'utilisateur, telles que les clics, les soumissions de formulaires et les interactions, restent privées et protégées contre l'écoute ou l'accès non autorisé pendant leur transit.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="box">
                <div class="our-services database p-2">
                    <div class="icon"> <img src="https://i.imgur.com/VzjZw9M.png" /> </div>
                    <h4>Data Visualization</h4>
                    <p>Le service fournit des visualisations de données claires et intuitives, ce qui permet aux propriétaires de sites web d'interpréter plus facilement les données collectées et d'agir en conséquence.</p>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

export default home;
