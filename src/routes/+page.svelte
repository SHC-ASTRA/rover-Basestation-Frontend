<script>
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Styles
	} from '@sveltestrap/sveltestrap'

	import * as fr from '../presets/Arm/Control.svelte'


//  const IP = "ws:// /api/";
// 	function SEN()
// 	{
// 		var AB = (fI[i].join('|'));

// 		fetch(IP + "proto/Endpoints");

// 		swiss.send(AB);


// 		if(i == 1)
// 		i = 0;
// 		else
// 		i = 1;
// 	}
	
// 	function openSocket()
// 	{
// 		setTimeout(SEN);
// 	}
	
// 	var i = 0;
// 	fake data
// 	const fI = new Array(new Array("CONa","1","1","0","0","0","1","1","0","0","0","1","1","1","0","1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"), new Array("CONb","1","1","0","0","0","1","1","0","0","0","1","1","1","0","1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"))
	
// 	const swiss = new WebSocket("ws:// /api/ws/basestation");
//     swiss.addEventListener("open", ()=> {
//         openSocket();
//     })

	const SubTeams = ["dev", "Arm", "Autonomy", "Base Station", "Biosensor", "Core", "Drone"];

	let ret = $state("");

	async function ld()
	{
		ret = await (await fetch(`/${SubTeams[presets / 16]}/${presets % 16}`)).text();
	}

	function exportTestFile()
	{
		let html = document.getElementById('dynamic')?.firstElementChild?.outerHTML;
		console.log(html);
	}

	var presets = $state(0);
	
</script>
<!-- 
Snippets
separate HTML files
use svelte SPA templating for presets
-->
<div>
	<img src="favicon.png" alt="Astra Logo" class="lImg">
	<img src="clucky.png" alt="Clucky!" class="rImg">
	<h1><ruby>UAH Space Hardware Club ASTRA<rt>Autonomous Science Target Recognition and Analysis</rt></ruby></h1>

	<div class="buttonDiv">
		<Button class="refreshButton" on:click={() => ld()}>
			Refresh
		</Button>

	</div>
	<span class="inlineButton" style:bottom=37px>
		<Button class="refreshButton" on:click={() => exportTestFile()}>
			Export
		</Button>
	</span>

	<div style:width=0% style:right=60pt style:position=absolute>
		<Styles/>
		<Dropdown class="inlineButton">
			<DropdownToggle class="dropdownParent">▼Presets</DropdownToggle>
			<DropdownMenu>
				<DropdownItem class="dropdown-item" on:click={() => {presets = 0x00; ld()}}>Development</DropdownItem>
				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Arm
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x10; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x11; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x12; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Autonomy
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x20; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x21; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x22; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Based Station
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x30; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x31; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x32; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Bio Sensor
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x40; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x41; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x42; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Core Rover
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x50; ld()}}>Telemetry</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x51; ld()}}>Driving</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x52; ld()}}></DropdownItem>
					</DropdownMenu>
				</Dropdown>

			</DropdownMenu>
		</Dropdown>
	</div>
</div>

<!-- Literally just masks over a strange "lip" -->
<div style="background-color:white" style:width=100% style:position=relative style:border-bottom-width=0px style:border-bottom-style=solid style:margin-bottom=0px style:bottom=37px style:height=40px></div>

<div id="dynamic">
	<!-- {@html ret} -->
	{@render fr.frame()}
</div>