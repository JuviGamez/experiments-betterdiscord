/**
 * @name Experiments
 * @author Megumin, Vee, Nickyux, BanTheNons, Nuckyz and Juvi Gamez
 * @description Enable Access to Experiments & other dev-only features in Discord! Ported from Vencord to BetterDiscord!
 * @version 1.0.0
 */

module.exports = class PasteCustomCode {
    start() {
        this.pasteCode();
    }

    stop() {
        // Code to run when the plugin is disabled (optional)
    }

    pasteCode() {
        const code = `
            webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=Object.values(r.c)]);
            var UserStore = cache.find(m => m?.exports?.default?.getCurrentUser).exports.default;
            var actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
            var user = UserStore.getCurrentUser();
            actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
                type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
            });
            actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
            webpackChunkdiscord_app.pop(); user.flags &= ~1; "done";
        `;

        try {
            const script = document.createElement('script');
            script.appendChild(document.createTextNode(code));
            (document.head || document.documentElement).appendChild(script);
            script.parentNode.removeChild(script);
            console.log('Custom code successfully pasted and executed in the console');
        } catch (error) {
            console.error('Error executing custom code:', error);
        }
    }
};
