// Sidebar Collapse/Expand Functionality
document.querySelector('.toggle').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');

  const maincontent = document.querySelector('.main-content-wrapper');
  maincontent.classList.toggle('collapsed');

  const header = document.querySelector('.header');
  header.style.left = sidebar.classList.contains('collapsed') ? '80px' : '250px';
  header.style.width = sidebar.classList.contains('collapsed') ? 'calc(100% - 80px)' : 'calc(100% - 250px)';

  // Handle home image collapse (if applicable)
  const meterReports = document.querySelector('#meterReports');
  const meterReportsNestedMenu = document.querySelector('#meterReportsNestedMenu');

  if (meterReports.classList.contains('expanded')) {
    meterReports.classList.remove('expanded');
    meterReportsNestedMenu.style.display = 'none';
  }

  document.querySelector('.image-home')?.classList?.toggle('collapsed');
});

// Expandable/Collapsible Menu Items
document.querySelectorAll('.toggle-link').forEach(function(toggleLink) {
  toggleLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior

      // Toggle the parent 'expanded' class for the dropdown
      const parentLi = toggleLink.parentElement;
      parentLi.classList.toggle('expanded');

      // Toggle visibility of the nested menu
      const nestedMenu = parentLi.querySelector('.nested-menu');
      if (nestedMenu.style.display === 'block') {
          nestedMenu.style.display = 'none';
      } else {
          nestedMenu.style.display = 'block';
      }
  });
});

// Home Table Collapse/Expand Functionality
document.querySelectorAll('.expandable-row').forEach(function(row) {
  row.addEventListener('click', function() {
    const icon = this.querySelector('span');
    const isCollapsed = icon.textContent === '+';
    icon.textContent = isCollapsed ? '-' : '+';
    
    // Use Bootstrap collapse classes instead of a custom class
    const target = document.querySelector(this.getAttribute('data-target'));
    target.classList.toggle('collapse'); // Keep the Bootstrap class here
    calculateTotals();
  });
});

// Meter Reports Click Event
document.querySelector('#meterReports').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.toggle('collapsed');
  }
  const maincontent = document.querySelector('.main-content-wrapper');
  if (maincontent.classList.contains('collapsed')) {
    maincontent.classList.toggle('collapsed');
  }
});

// Calculate Totals Functionality
function calculateTotals() {
  let totalInstalled = 0;
  let totalCommissioned = 0;
  let totalCommunicated = 0;
  let totalIntegrated = 0;

  document.querySelectorAll('tr.highlight').forEach(function(row) {
    const cols = row.querySelectorAll('td');
    if (cols.length > 1) {
        totalInstalled += parseInt(cols[1].textContent) || 0;
        totalCommissioned += parseInt(cols[2].textContent) || 0;
        totalCommunicated += parseInt(cols[3].textContent) || 0;
        totalIntegrated += parseInt(cols[4].textContent) || 0;
    }
  });

  if (document.getElementById('total-installed')) {
    document.getElementById('total-installed').textContent = totalInstalled;
  }
  if (document.getElementById('total-commissioned')) {
    document.getElementById('total-commissioned').textContent = totalCommissioned;
  }
  if (document.getElementById('total-communicated')) {
    document.getElementById('total-communicated').textContent = totalCommunicated;
  }
  if (document.getElementById('total-integrated')) {
    document.getElementById('total-integrated').textContent = totalIntegrated;
  }
}

// Call the calculateTotals function initially
calculateTotals();

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// input drop -down
const dropdownContainers = document.querySelectorAll('.dropdown-container');
dropdownContainers.forEach(container => {
  const dropdownInput = container.querySelector('.dropdown-input');
  const dropdownContent = container.querySelector('.dropdown-content');
  const selectedOptionsInput = container.querySelector('#selected-options');
  
  
  dropdownInput.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });
  

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  });

  
  const checkboxes = container.querySelectorAll('.dropdown-option input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedOptions = Array.from(checkboxes).filter(i => i.checked);
      
      if (selectedOptions.length > 0) {
        const firstOption = selectedOptions[0].value;
        const additionalCount = selectedOptions.length - 1;
        selectedOptionsInput.value = additionalCount > 0 
          ? `${firstOption} (+${additionalCount})` 
          : firstOption;
      } else {
        selectedOptionsInput.value = 'Select options';
      }
    });
  });
});
            

// $('#datepicker').datepicker({
//   format: "mm-yyyy",
//   startView: "months", 
//   minViewMode: "months",
//   autoclose: true
// });


$(document).ready(function () {
  $('.datepicker').datepicker({
      format: "mm-yyyy",       
      minViewMode: "months",     
      startView: "months",        
      autoclose: true  ,
      // orientation:"buttom",           
  });
});


$(document).ready(function () {
  let currentTabIndex = 0;
  const tabLinks = $('.abc');
  const tabContents = $('.tab-pane');

  tabLinks.on('click', function (event) {
      event.preventDefault();

      const index = tabLinks.index(this);
      console.log(index)

      if (index !== currentTabIndex) {
          const currentTabContent = tabContents.eq(currentTabIndex);
          const newTabContent = tabContents.eq(index);
          console.log(currentTabContent)

          currentTabContent.removeClass('active slide-in-right').addClass('slide-out-left');
          newTabContent.addClass('slide-in-right');

          newTabContent.on('animationend', function () {
              currentTabContent.removeClass('slide-out-left show active');
              newTabContent.addClass('show active');
              newTabContent.off('animationend');
          });

          tabLinks.eq(currentTabIndex).removeClass('active');
          tabLinks.eq(index).addClass('active');

          currentTabIndex = index;
      }
  });
});
 