<script>
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Styles
	} from '@sveltestrap/sveltestrap'

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

	let { ret = null } = $props();

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

<div style:height=100%>
	<img src="favicon.png" alt="Astra Logo" class="lImg">
	<img src="clucky.png" alt="Clucky!" class="rImg">
	<h1><ruby>UAH Space Hardware Club ASTRA<rt>Autonomous Science Target Recognition and Analysis</rt></ruby></h1>

	<div class="bDiv">
		<Button class="refreshButton" on:click={() => ld()}>
			Refresh
		</Button>

	</div>
	<div class="bDiv" style:left=120px>
		<Button class="refreshButton" on:click={() => exportTestFile()}>
			Export	
		</Button>
	</div>

	<div style:width=0% style:right=60pt style:position=absolute>
		<Styles/>
		<Dropdown>
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
						Core
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x50; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x51; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x52; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Dropdown direction="left" class="dropdown">
					<DropdownToggle caret class="dropdown-item">
						Drone
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x60; ld()}}>Alpha</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x61; ld()}}>Bravo</DropdownItem>
						<DropdownItem class="dropdown-subitem" on:click={() => {presets = 0x62; ld()}}>Charlie</DropdownItem>
					</DropdownMenu>
				</Dropdown>

			</DropdownMenu>
		</Dropdown>
	</div>
</div>

<div id="dynamic">
	{@html ret}
</div>