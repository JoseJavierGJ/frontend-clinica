<template>
  <v-container class="pa-4 bg-rose-50">
    <v-row class="mb-4">
      <v-col class="d-flex align-center">
        <v-text-field
          class="flex-grow-1"
          outlined
          hide-details
          single-line
          append-icon="mdi-magnify"
          placeholder="Search..."
        />
      </v-col>
    </v-row>
    <v-card color="#ffdec8" class="pa-4 d-flex align-center">
      <v-avatar color="blue darken-2" class="white--text mr-4">
        <v-icon>mdi-information</v-icon>
      </v-avatar>
      <v-col>
        <div class="font-weight-bold">
          New Covid-19 Update For Patients
        </div>
        <p>
          All Patients That Have Not Received Their Result For Covid-19 Will Need To Ensure They Stay
          Isolated For A Minimum Of 14 Days
        </p>
      </v-col>
      <v-btn color="blue darken-2" class="white--text">
        See More
      </v-btn>
    </v-card>

    <!-- Inicio del segundo componente -->
    <v-row class="gap-4 mt-4">
      <!-- Ajustamos las columnas aquí -->
      <v-col cols="12" md="4">
        <v-card class="pa-6" color="#ffdec8" elevation="2" style="height: 408px;">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Appointment
          </v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://placehold.co/60x60" alt="Doctor Image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  Dr. Paul MBBS,.MS.
                </v-list-item-title>
                <v-list-item-subtitle>Orthopedists Specialist</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- <v-card-actions class="justify-space-between">
            <v-btn icon color="red">
              <v-icon>mdi-close-circle</v-icon>
              Cancel Booking
            </v-btn>
            <v-btn icon color="blue">
              <v-icon>mdi-calendar-clock</v-icon>
              Reschedule
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-6" color="#ffdec8" elevation="2">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Recent Activity
          </v-card-title>
          <v-list three-line color="#ffdec8">
            <v-list-item-group>
              <v-list-item v-for="activity in activities" :key="activity.id">
                <v-list-item-avatar>
                  <v-img :src="activity.image" alt="Doctor Image" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ activity.doctor }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ activity.specialty }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip :color="activity.statusColor" small />
                </v-list-item-action>
                <v-list-item-subtitle class="flex-grow-1">
                  {{ activity.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Medication Section -->
      <v-col>
        <v-card class="pa-4" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Medication
          </v-card-title>
          <v-list color="#ffc198">
            <v-list-item-group>
              <v-list-item v-for="medication in medications" :key="medication.id">
                <v-list-item-content class="d-flex justify-space-between align-center">
                  <div>
                    <div class="text-h6 font-weight-bold">
                      {{ medication.name }} <span class="caption">({{ medication.dose }})</span>
                    </div>
                    <div class="subtitle-1">
                      {{ medication.instructions }}
                    </div>
                    <div class="caption text-primary">
                      {{ medication.lastRefill }}
                    </div>
                  </div>
                  <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- Current Condition Section -->
      <v-col>
        <v-card class="pa-6" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Current Condition Of Patients
          </v-card-title>
          <v-chip class="mb-4" color="orange darken-2" text-color="white">
            Moderate
          </v-chip>
          <div class="text-h5 font-weight-bold mb-2">
            Sinusitis
          </div>
          <div class="subtitle-1 mb-4">
            A Condition In Which The Cavities Around The Nasal Passages Become Inflamed
          </div>
          <v-row>
            <v-col>
              <div class="subtitle-2 font-weight-bold">
                Primary Doctor
              </div>
              <div>Dr. Jenni</div>
            </v-col>
            <v-col>
              <div class="subtitle-2 font-weight-bold">
                Treatment
              </div>
              <div>Nasonex Aerosol<br>Mometasone Furate 50mcg/Spray</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Recent Bills Section -->
      <v-col>
        <v-card class="pa-6" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Recent Bills
          </v-card-title>
          <div>
            <div class="subtitle-1">
              Your Payment
            </div>
            <div class="text-h4 font-weight-bold">
              $110.00
            </div>
          </div>
          <v-row class="subtitle-1 my-4">
            <v-col>
              <div>Medicare</div>
              <div class="font-weight-bold">
                $125.00
              </div>
            </v-col>
            <v-col>
              <div>Total</div>
              <div class="font-weight-bold">
                $234.00
              </div>
            </v-col>
          </v-row>
          <div class="caption mb-4">
            Paid On The 27 April, 2020 To Dorian Med Pty Ltd
          </div>
          <div class="caption mb-4">
            Suite 206/203-233 New King James Rd, Edgecliff NSW 2027
          </div>
          <v-btn text color="primary">
            Next Appointment
          </v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CombinedComponent',
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      activities: [
        {
          id: 1,
          doctor: 'Dr. Paul MBBS,.MS.',
          specialty: 'Orthopedists Specialist',
          image: 'https://placehold.co/60x60',
          statusColor: 'green',
          description: 'Dr Ramadi Entersilikokaz Added Two New Conditons To Your Health Record On The 09 May Regarding Your Symptoms'
        },
        {
          id: 2,
          doctor: 'Dr. Jenni MBBS,.MS.',
          specialty: 'Hearts Specialist',
          image: 'https://placehold.co/60x60',
          statusColor: 'red',
          description: 'Medicare Has Sent A Benefit Of $132.44 For Item (Token Id65316152)'
        },
        {
          id: 3,
          doctor: 'Dr. Micheal MBBS,.MS.',
          specialty: 'Lungs Specialist',
          image: 'https://placehold.co/60x60',
          statusColor: 'green',
          description: 'Dr Kalish Has Updated The Prescription Of Alfousin From 8mg To 10mg'
        }
      ],
      medications: [
        { id: 1, name: 'Fenofibrate', dose: '48mg', instructions: 'Take With Food Every Morning', lastRefill: 'Last Refill 21/01/2023' },
        { id: 2, name: 'Alfuzosin', dose: '10mg', instructions: 'Take 1 With Food Twice A Day And Avoid Drinking Alcohol For 2 Hours After', lastRefill: 'Last Refill 27/01/2023' },
        { id: 3, name: 'Dexamethasone', dose: '4mg', instructions: 'Take 3 Tablets 3 Times A Day For 7 Days', lastRefill: 'Last Refill 24/01/2023' }
      ]
    }
  }
}
</script>

<style scoped>
.bg-rose-50 {
  background-color: #fff4ec;
}

.pa-4 {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}

.mr-4 {
  margin-right: 16px;
}
</style>
