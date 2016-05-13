cs.ns('___config.package___')
___config.package___.ctrl = cs.clazz({
    extend: app.fw.root.ctrl,
    mixin: [
        app.trait.root.businessservices.ctrl
    ],
    dynamics: {},
    protos: {

        create () {
            this.base(___config.package___.model, ___config.package___.view)
            cs(this).property('ComponentJS:state-auto-increase', true)
        },

        setup () {
            this.base()

            const lang = this.userLanguage()
            moment.locale((lang == "en" || lang == "de") ? lang : "de")
            numeral.language((lang == "en" || lang == "de") ? lang : "de")

            //
            //    M A R K U P   L O A D I N G
            //
            cs(this).guard('prepare', +1)
            try {
                $(document).ready(() => {
                    $.markup.load(() => {
                        cs(this).guard('prepare', -1)
                    })
                })
            } catch (e) {
                cs(this).guard('prepare', -1)
            }
        },

        prepare () {
            this.base()

            this.observeParentModel('global:data:currentUser', (ev, currentUser) => {
                const user = this.model.value('global:data:currentUser')
                if (user && user !== currentUser) {
                    // Es ist bereits ein Benutzer angemeldet gewesen.
                    // Nun wird ein neuer User angemeldet - zur Sicherheit laden wir die Anwendung neu um alle
                    // Einstellungen, Module und userspezifischen Inhalte konsistent zu halten.
                    // Es darf nicht passieren, das ein Benutzer Daten, Processe und Einstellungen eines anderen Benutzers
                    // sieht
                    // Alternativ: wird der currentUser reseted was einer Abmeldung gleich kommt. Dann auch Neuladen
                    // in beiden Fällen war schon ein 'user' vorhanden
                    app.reload()
                } else if (currentUser && user !== currentUser) {
                    // when everything is done the guard can be resetted
                    cs(this).guard('ready', 0)
                }
            })

        },

        render () {
            cs(this).guard('ready', +1)
            this.service.call('whoAmI', (success, result, loginNeeded) => {
                if (success) {
                    this.handleCurrentUser(result)
                } else if (loginNeeded) {
                    this.handleLogin()
                } else {
                    this.onError(result)
                    // wenn beim start nicht ermittelt werden kann welcher Benutzer angemeldet ist und auch keine
                    // Aufforderung für einen Login erscheint, dann beenden wir das Programm
                    app.shutdown()
                }
                if (success || loginNeeded) {
                    cs(this).guard('ready', 0)
                }
            })
        },

        ready () {
            this.base()
            this.publishEventToParent('contentReady')
        },

        userLanguage() {
            return this.model.value('global:data:userLanguage')
        },

        /**
         * Für alle Requests die nicht ueber den sv laufen, wie uploads und downloads, sondern ueber iFrames
         * @param text Der Inhalt des iFrames als text
         * @param messageId
         */
        handleTechnicalError (text, messageId) {
            let result = {}
            try {
                // 1.) versuche den Inhalt des Response zu parsen und prüfe ob es ein Server Error Object ist
                //     ein nicht parsebarer Inhalt erzeugt einen Fehler (z.B. HTML Inhalte)
                result = JSON.parse(text)
                // 1a.) Ein ungültiges Response Object wird auch in einen Fehler umgewandelt
                if (!this.hasError(result)) {
                    throw new Error('The parsed result object is no legal error object.')
                }
            } catch (e) {
                let textSnippet = text.substring(0, Math.min(text.length - 1, 20))
                if (text.length >= 20) {
                    textSnippet += '...'
                }
                //1b.) und ein eigenes error Object wird erzeugt
                result = {
                    parseFailure: true,
                    messageId: messageId,
                    messageParams: [htmlEncode(textSnippet)]
                }
            }
            return result
        },

        hasError (responseObj) {
            return responseObj &&
                Object.prototype.toString.call(responseObj) === Object.prototype.toString.call({}) &&
                responseObj.messageId
        },

        handleCurrentUser (userObj) {
            //const user = app.util.EntityCreateUtil.importUsers(userObj)
            this.model.value('global:data:currentUser', userObj)
        }

    }
})