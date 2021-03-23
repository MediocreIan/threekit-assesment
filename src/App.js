import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Input from './input'
import 'bootstrap/dist/css/bootstrap.min.css';


function App()
{
  let selected = null;
  let setSelected = null;
  let savedData = {};
  let setSavedData = null
  useEffect(() =>
  {
    console.log('test')
    window
      .threekitPlayer({
        authToken: "0005d11b-9ffa-4ec7-9147-abcdb2a112ec",
        el: document.getElementById("player"),
        assetId: "34a411a0-ee60-4cc3-9ed8-6dc96ea62274",
        initialConfiguration : {
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
                  console.log(nodeInfo);
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
    <div className="App">

      <div id="player" style={{width:'600px', height:"300px", margin:"auto", border:"3px solid grey", borderRadius:'5px'}}>player</div>
      <Input onMount={onDisplayMount}></Input>

    </div>
  );
}

export default App;
