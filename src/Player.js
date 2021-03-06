import './App.css';
import React, {useState, useEffect} from 'react';
import Input from './input'
import 'bootstrap/dist/css/bootstrap.min.css';


function Player()
{
    let selected = null;
    let setSelected = null;
    let savedData = {};
    let setSavedData = null
    useEffect(() =>
    {
        window
            .threekitPlayer({
                authToken: "0005d11b-9ffa-4ec7-9147-abcdb2a112ec",
                el: document.getElementById("player"),
                assetId: "34a411a0-ee60-4cc3-9ed8-6dc96ea62274",
                initialConfiguration: {
                    showAR: true

                }
            })
            .then(async api =>
            {
                window.player = api;
                window.configurator = await api.getConfigurator();
                window.configurator.setConfiguration({
                    "Key": "value"
                });
                // api.tools.addTool({
                //   label: 'click',
                //   key: 'click',
                //   active: true,
                //   enabled: true,
                //   hanlders: api.click()
                // })
                api.tools.addTool({

                    key: "partSelect",
                    label: "Part Select Tool",
                    active: true,
                    enabled: true,
                    handlers: {
                        click: (ev) =>
                        {
                            const hits = ev.hitNodes;
                            const nodeId = hits && hits.length > 0 && hits[0].nodeId;
                            if (nodeId) {
                                const selectable = api.scene.get({
                                    id: nodeId,
                                    plug: "Properties",
                                    property: "selectable",
                                });
                                if (selectable || typeof selectable === "undefined") {
                                    api.selectionSet.set(nodeId);
                                    const nodeInfo = api.scene.get({id: nodeId});
                                    setSelected(nodeInfo.name)
                                    Array.from(document.querySelectorAll("input")).forEach(
                                        input => (input.value = "")
                                    );
                                } else {
                                    api.selectionSet.clear();
                                }
                            } else {
                                api.selectionSet.clear();
                            }
                        },
                    },
                });

                api.tools.setPrimary('orbit')
            });

    });
    const onDisplayMount = (dataFromChild) =>
    {
        selected = dataFromChild[0];
        setSelected = dataFromChild[1];
        savedData = dataFromChild[2];
        setSavedData = dataFromChild[3]
    };
    return (
        <div className="Player">
            <div style={{display: 'flex', flexDirection: 'horizontal', margin: '5vh 5vh 5vh 5vh', flexWrap: 'wrap'}}>
                <div id="player" style={{
                    // flex: "1",
                    height: "90vh",
                    width: "500px",
                    border: "3px solid grey",
                    borderRadius: '5px',
                    backgroundColor: "#e3eff4",
                    marginRight: '5px'
                }}>player</div>
                <Input onMount={onDisplayMount}></Input>
            </div>
        </div>
    );
}

export default Player;
