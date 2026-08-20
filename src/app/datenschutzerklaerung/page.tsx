import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der hema computersysteme ag: Umgang mit personenbezogenen Daten, Cookies, Drittanbieter-Dienste und Ihre Rechte.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        description="Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften."
        breadcrumb={[
          { label: "Datenschutzerklärung", href: "/datenschutzerklaerung" },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            <h2>Verantwortliche Stelle</h2>
            <p>
              hema computersysteme ag
              <br />
              Gewerbestrasse 28
              <br />
              6438 Ibach
              <br />
              Schweiz
              <br />
              E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <strong>Vertretungsberechtigte Personen:</strong> Bruno Marty,
              Martin Ulrich, Patrick von Rickenbach, Michael Kälin, Stephan
              Schuler
            </p>
            <p>
              <strong>Datenschutzbeauftragte Person:</strong> Bruno Marty,{" "}
              <a href="tel:+41418338888">+41 41 833 88 88</a>,{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>

            <h2>Allgemeines / Einleitung</h2>
            <p>
              Gestützt auf Artikel 13 der Schweizerischen Bundesverfassung und
              die datenschutzrechtlichen Bestimmungen des Bundes
              (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer
              Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen
              Daten. Die Betreiber dieser Seiten nehmen den Schutz Ihrer
              persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der
              gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung.
            </p>
            <p>
              In Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns,
              die Datenbanken so gut wie möglich vor unberechtigtem Zugriff,
              Verlust, Missbrauch oder Verfälschung zu schützen.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
              kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich.
            </p>
            <p>
              Durch die Nutzung dieser Website erklären Sie sich mit der
              Erhebung, Verarbeitung und Nutzung von Daten gemäss der
              nachfolgenden Beschreibung einverstanden. Diese Website kann
              grundsätzlich ohne Registrierung besucht werden. Daten wie
              aufgerufene Seiten oder Namen von aufgerufenen Dateien, Datum und
              Uhrzeit werden zu statistischen Zwecken auf dem Server
              gespeichert, ohne dass diese Daten unmittelbar auf Ihre Person
              bezogen werden. Soweit auf unseren Seiten personenbezogene Daten
              (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
              werden, erfolgt dies, soweit möglich, stets auf freiwilliger
              Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht
              an Dritte weitergegeben.
            </p>

            <h2>Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Dabei handelt es sich um kleine
              Textdateien, die es ermöglichen, spezifische, auf den Nutzer
              bezogene Informationen auf dem Endgerät des Nutzers zu speichern,
              während der Nutzer die Website nutzt. Cookies ermöglichen es
              insbesondere, die Nutzungshäufigkeit und die Anzahl der Nutzer der
              Seiten zu ermitteln, Verhaltensmuster der Seitennutzung zu
              analysieren, aber auch unser Angebot kundenfreundlicher zu
              gestalten. Cookies bleiben über das Ende einer Browser-Sitzung
              hinaus gespeichert und können bei einem erneuten Besuch der Seite
              wieder abgerufen werden. Wenn Sie dies nicht wünschen, sollten Sie
              Ihren Internet-Browser so einstellen, dass er die Annahme von
              Cookies verweigert.
            </p>
            <p>
              Ein genereller Widerspruch gegen die Verwendung von Cookies zu
              Online-Marketing-Zwecken kann für eine Vielzahl der Dienste,
              insbesondere beim Tracking, über die US-Seite{" "}
              <a
                href="http://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info/choices
              </a>{" "}
              oder die EU-Seite{" "}
              <a
                href="http://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                youronlinechoices.com
              </a>{" "}
              erklärt werden. Darüber hinaus kann die Speicherung von Cookies
              durch Deaktivierung in den Browsereinstellungen erreicht werden.
              Bitte beachten Sie, dass in diesem Fall nicht alle Funktionen
              dieses Online-Angebots genutzt werden können.
            </p>

            <h2>SSL/TLS-Verschlüsselung</h2>
            <p>
              Diese Website verwendet aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte, wie z.B. Anfragen, die Sie an
              uns als Seitenbetreiber senden, eine SSL/TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
              des Browsers von «http://» auf «https://» wechselt und am
              Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- oder
              TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an
              uns übermitteln, nicht von Dritten gelesen werden.
            </p>

            <h2>Dienste von Drittanbietern</h2>
            <p>
              Diese Website kann Google Maps zur Einbettung von Karten, Google
              Invisible reCAPTCHA zum Schutz vor Bots und Spam und YouTube zur
              Einbettung von Videos nutzen. Diese Dienste der amerikanischen
              Google LLC verwenden u.a. Cookies, wodurch Daten an Google in die
              USA übertragen werden, wobei wir davon ausgehen, dass in diesem
              Zusammenhang allein durch die Nutzung unserer Website kein
              personenbezogenes Tracking stattfindet. Weitere Informationen
              finden Sie in den{" "}
              <a
                href="http://www.google.de/intl/de/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzbestimmungen von Google
              </a>
              .
            </p>

            <h3>Google Maps</h3>
            <p>
              Diese Website nutzt das Angebot von Google Maps. Dies ermöglicht
              es uns, interaktive Karten direkt auf der Website darzustellen und
              Ihnen die komfortable Nutzung der Kartenfunktion zu ermöglichen.
              Durch den Besuch der Website erhält Google die Information, dass
              Sie die entsprechende Unterseite unserer Website aufgerufen haben.
              Dies geschieht unabhängig davon, ob Google ein Nutzerkonto
              bereitstellt, über das Sie eingeloggt sind, oder ob kein
              Nutzerkonto vorhanden ist. Wenn Sie bei Google eingeloggt sind,
              werden Ihre Daten direkt Ihrem Konto zugeordnet. Wenn Sie die
              Zuordnung zu Ihrem Profil bei Google nicht wünschen, müssen Sie
              sich vor Aktivierung der Schaltfläche ausloggen. Sie haben das
              Recht, der Erstellung dieser Nutzerprofile zu widersprechen, wobei
              Sie sich zur Ausübung dieses Rechts an Google wenden müssen.
            </p>

            <h3>Facebook</h3>
            <p>
              Diese Website nutzt Funktionen der Facebook Inc., 1601 S.
              California Ave, Palo Alto, CA 94304, USA. Wenn Sie unsere Seiten
              mit Facebook-Plugins aufrufen, wird eine Verbindung zwischen Ihrem
              Browser und den Facebook-Servern hergestellt. Dabei werden bereits
              Daten an Facebook übermittelt. Wenn Sie ein Facebook-Konto
              besitzen, können diese Daten mit diesem verknüpft werden. Wenn Sie
              nicht möchten, dass diese Daten mit Ihrem Facebook-Konto verknüpft
              werden, loggen Sie sich bitte vor dem Besuch unserer Seite bei
              Facebook aus. Mehr dazu erfahren Sie unter{" "}
              <a
                href="https://de-de.facebook.com/about/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                de-de.facebook.com/about/privacy
              </a>
              .
            </p>

            <h3>Instagram</h3>
            <p>
              Auf unserer Website sind Funktionen des Dienstes Instagram
              eingebunden. Diese Funktionen werden angeboten durch die Instagram
              Inc., 1601 Willow Road, Menlo Park, CA 94025, USA. Wenn Sie in
              Ihrem Instagram-Account eingeloggt sind, können Sie die Inhalte
              unserer Seiten auf Ihrem Instagram-Profil verlinken, indem Sie den
              Instagram-Button anklicken. Dadurch kann Instagram den Besuch
              unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf
              hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt
              der übermittelten Daten sowie deren Nutzung durch Instagram
              erhalten. Weitere Informationen finden Sie in den{" "}
              <a
                href="http://instagram.com/about/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzbestimmungen von Instagram
              </a>
              .
            </p>

            <h2>Vertragliche Leistungen</h2>
            <p>
              Wir verarbeiten die Daten unserer Vertragspartner und
              Interessenten sowie sonstiger Auftraggeber, Kunden, Klienten oder
              Vertragspartner (einheitlich als «Vertragspartner» bezeichnet) im
              Einklang mit den datenschutzrechtlichen Bestimmungen des
              Bundesdatenschutzgesetzes (DSG) und der EU-DSGVO gemäss Art. 6
              Abs. 1 lit. b DSGVO, um ihnen unsere vertraglichen oder
              vorvertraglichen Leistungen zu erbringen. Die in diesem
              Zusammenhang verarbeiteten Daten, Art, Umfang und Zweck sowie die
              Erforderlichkeit ihrer Verarbeitung ergeben sich aus dem
              zugrundeliegenden Vertragsverhältnis.
            </p>
            <p>
              Zu den verarbeiteten Daten gehören die Stammdaten unserer
              Vertragspartner (z.B. Namen und Adressen), Kontaktdaten (z.B.
              E-Mail-Adressen und Telefonnummern) sowie Vertragsdaten (z.B. in
              Anspruch genommene Leistungen, Vertragsinhalte,
              Vertragskommunikation, Namen von Ansprechpartnern) und
              Zahlungsdaten. Wir verarbeiten grundsätzlich keine besonderen
              Kategorien personenbezogener Daten, es sei denn, diese sind
              Bestandteil einer Auftrags- oder Vertragsabwicklung.
            </p>
            <p>
              Im Rahmen der Nutzung unserer Online-Dienste können wir die
              IP-Adresse und den Zeitpunkt der jeweiligen Nutzeraktion
              speichern. Die Speicherung erfolgt auf Grundlage unserer
              berechtigten Interessen sowie der Interessen der Nutzer am Schutz
              vor Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe
              dieser Daten an Dritte erfolgt grundsätzlich nicht, es sei denn,
              sie ist für die Verfolgung unserer Ansprüche erforderlich oder es
              besteht eine gesetzliche Verpflichtung dazu.
            </p>
            <p>
              Die Löschung der Daten erfolgt, wenn die Daten zur Erfüllung
              vertraglicher oder gesetzlicher Sorgfaltspflichten sowie zur
              Abwicklung etwaiger Gewährleistungs- und vergleichbarer
              Verpflichtungen nicht mehr erforderlich sind, wobei die
              Erforderlichkeit der Aufbewahrung der Daten in unregelmässigen
              Abständen überprüft wird. Im Übrigen gelten die gesetzlichen
              Aufbewahrungspflichten.
            </p>

            <h2>Administration und Finanzbuchhaltung</h2>
            <p>
              Wir verarbeiten Daten im Einklang mit den datenschutzrechtlichen
              Bestimmungen der Schweizerischen Eidgenossenschaft (DSG) und der
              EU-DSGVO im Rahmen von Verwaltungsaufgaben sowie der Organisation
              unseres Betriebs, der Finanzbuchhaltung und der Erfüllung
              gesetzlicher Pflichten, wie z.B. der Archivierung. Dabei
              verarbeiten wir dieselben Daten, die wir im Rahmen der Erbringung
              unserer vertraglichen Leistungen verarbeiten. Von der Verarbeitung
              sind Kunden, Interessenten, Geschäftspartner und Webseitenbesucher
              betroffen.
            </p>
            <p>
              In diesem Zusammenhang offenbaren oder übermitteln wir Daten an
              die Finanzbehörden, Berater wie Steuerberater oder
              Wirtschaftsprüfer sowie andere Honorarstellen und
              Zahlungsdienstleister. Darüber hinaus speichern wir aufgrund
              unserer geschäftlichen Interessen Informationen über Lieferanten,
              Veranstalter und andere Geschäftspartner, z.B. zum Zwecke der
              späteren Kontaktaufnahme. Diese zumeist unternehmensbezogenen
              Daten werden in der Regel dauerhaft gespeichert.
            </p>

            <h2>Urheberrechte</h2>
            <p>
              Das Urheberrecht und alle anderen Rechte an den Inhalten, Bildern,
              Fotos oder sonstigen Dateien auf der Website gehören
              ausschliesslich dem Betreiber dieser Website oder den namentlich
              genannten Rechteinhabern. Für die Vervielfältigung sämtlicher
              Dateien muss vorab die schriftliche Zustimmung der
              Urheberrechtsinhaber eingeholt werden. Wer ohne Zustimmung der
              jeweiligen Urheberrechtsinhaber eine Urheberrechtsverletzung
              begeht, kann sich strafbar machen und unter Umständen
              Schadenersatzansprüche geltend machen.
            </p>

            <h2>Haftungsausschluss</h2>
            <p>
              Alle Angaben auf unserer Website wurden sorgfältig geprüft. Wir
              sind bemüht, dafür Sorge zu tragen, dass die von uns
              bereitgestellten Informationen aktuell, richtig und vollständig
              sind. Dennoch ist das Auftreten von Fehlern nicht völlig
              auszuschliessen, so dass wir für die Vollständigkeit, Richtigkeit
              und Aktualität der Informationen, auch
              journalistisch-redaktioneller Art, keine Gewähr übernehmen können.
              Haftungsansprüche, die sich auf Schäden materieller oder ideeller
              Art beziehen, welche durch die Nutzung oder Nichtnutzung der
              dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und
              unvollständiger Informationen verursacht wurden, sind
              grundsätzlich ausgeschlossen.
            </p>
            <p>
              Der Herausgeber kann Texte nach eigenem Ermessen und ohne
              vorherige Ankündigung ändern oder löschen und ist nicht dazu
              verpflichtet, die Inhalte dieser Website zu aktualisieren. Die
              Nutzung dieser Website bzw. der Zugang zu ihr erfolgt auf eigenes
              Risiko des Besuchers. Der Herausgeber, seine Kunden oder Partner
              sind nicht verantwortlich für Schäden wie z.B. direkte, indirekte,
              zufällige oder Folgeschäden, die angeblich durch den Besuch dieser
              Website verursacht wurden, und übernehmen folglich keine Haftung
              für solche Schäden.
            </p>
            <p>
              Der Herausgeber übernimmt auch keine Verantwortung oder Haftung
              für den Inhalt und die Verfügbarkeit von Websites Dritter, die
              über externe Links von dieser Website aus erreicht werden können.
              Für den Inhalt der verlinkten Seiten sind ausschliesslich deren
              Betreiber verantwortlich. Der Herausgeber distanziert sich daher
              ausdrücklich von allen fremden Inhalten, die möglicherweise straf-
              oder haftungsrechtlich relevant sind oder gegen die guten Sitten
              verstossen.
            </p>
            <p>
              Alle Angebote sind freibleibend. Der Herausgeber behält es sich
              ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne
              gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder
              die Veröffentlichung zeitweise oder endgültig einzustellen.
            </p>
          </Prose>

          <Card className="h-fit p-7 lg:sticky lg:top-32">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
              Kontakt Datenschutz
            </p>
            <div className="mt-6 flex flex-col gap-4 text-sm">
              <div>
                <p className="text-xs text-brand-950/55">
                  Datenschutzbeauftragte Person
                </p>
                <p className="mt-1 font-medium text-brand-950">Bruno Marty</p>
              </div>
              <div>
                <p className="text-xs text-brand-950/55">Telefon</p>
                <a
                  href="tel:+41418338888"
                  className="mt-1 block font-medium text-brand-900 hover:text-accent-500"
                >
                  +41 41 833 88 88
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-950/55">E-Mail</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block font-medium text-brand-900 hover:text-accent-500"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-950/55">Adresse</p>
                <p className="mt-1 text-brand-950/80">
                  Gewerbestrasse 28
                  <br />
                  6438 Ibach, Schweiz
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
